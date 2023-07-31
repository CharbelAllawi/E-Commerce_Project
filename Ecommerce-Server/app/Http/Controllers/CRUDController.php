<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\JsonEncodingException;
use Illuminate\Http\Request;

class CRUDController extends Controller
{
  public function removeproduct($id)
  {
    $product = Product::where('product_id', $id)->delete(); // or firstOrFail() if you want to throw an exception if not found


  }
  public function addOrUpdateProduct(Request $request, $id = "add")
  {
    if ($id == "add") {
      $product = new Product;
    } else {
      $product = Product::where('product_id', $id)->first();
    }

    $product->category_id = $request->category_id ? $request->category_id : $product->category_id;
    $product->name = $request->name ? $request->name : $product->name;
    $product->description = $request->description ? $request->description : $product->description;
    $product->price = $request->price ? $request->price : $product->price;
    $product->color = $request->color ? $request->color : $product->color;

    if ($request->hasFile('imageurl')) {
      $file_name = time() . "product_image" . "." . $request->imageurl->extension();
      $request->imageurl->move(storage_path('images'), $file_name);
      $product->imageurl = storage_path("images") . "\\" . $file_name;
    }

    $product->save();

    return json_encode(["products" => $product]);
  }
}
