<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 
        'description', 
        'price', 
        'stock', 
        'quantity',
        'categories_id'
    ];


    public function images(){
        return $this->hasMany('App\Models\Images', 'product_id');
    }


    public function categories(){
        return $this->belongsTo('App\Models\Categories', 'categories_id');
    }

    public function comments(){
        return $this->hasMany('App\Models\Comments', 'product_id');
    }




}
