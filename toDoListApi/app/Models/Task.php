<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'completed'];

    // Define los campos que se pueden llenar con mass assignment
    // En este caso, permitimos llenar los campos title, description y completed
}
