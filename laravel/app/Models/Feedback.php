<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    /**
     * @var mixed|string
     */
    protected $table = 'feedbacks';
    protected $fillable = ['text', 'fingerprint', 'api_key', 'type', 'device', 'page', 'created_at', 'updated_at', 'user'];
}
