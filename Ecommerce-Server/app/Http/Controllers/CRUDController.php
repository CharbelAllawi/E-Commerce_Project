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
}
