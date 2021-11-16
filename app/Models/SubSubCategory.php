<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\subcategory;

class SubSubCategory extends Model
{
    use HasFactory;

    protected $table='sub_subcategories';
    protected $guarded=[];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    
    public function subcategory()
    {
        return $this->belongsTo(SubCategory::class,'sub_category_id');
    }

}
