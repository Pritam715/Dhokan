<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use App\Models\ProductAttributes;
use App\Models\ProductDiscount;

class Product extends Model
{
    use HasFactory;

    protected $table='products';
    protected $guarded=[];

    public function category()
    {
            return $this->belongsTo(Category::class, 'category_id');
        
    }

    public function subcategory()
    {
            return $this->belongsTo(SubCategory::class, 'subcategory_id');
        
    }

    public function subsubcategory()
    {
            return $this->belongsTo(SubSubCategory::class, 'sub_subcategory_id');
        
    }

    public function attr()
    {
            return $this->hasMany(ProductAttributes::class,'product_id');
    }

    public function discount()
    {
            return $this->hasOne(ProductDiscount::class);
    }

}
