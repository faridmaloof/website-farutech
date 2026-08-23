<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $table = 'contact_messages';

    protected $fillable = [
        'name', 'email', 'phone', 'message', 'status', 'created_at'
    ];

    protected $casts = [
        'status' => 'string'
    ];

    public function tag()
    {
        return $this->belongsToMany('App\Models\Tag');
    }
}