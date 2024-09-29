<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'check_in', 'check_out', 'status'];
    protected $table = 'attendance';

    public function user() {
        return $this->belongsTo(User::class);
    }
}