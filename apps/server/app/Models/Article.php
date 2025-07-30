<?php
// app/Models/Article.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    // Define which attributes can be mass-assigned
    protected $fillable = [
        'title',
        'slug',
        'category',
        'excerpt',
        'content',
        'image_url',
        'is_published',
        'published_at',
        'user_id',
    ];

    // Define the relationship to the User model
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}