<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    private function ensureUserIsAdmin(Request $request)
    {
        if (!$request->user() || !$request->user()->is_admin) {
            abort(403, 'This action is unauthorized.');
        }
    }

    /**
     * Display a listing of PUBLISHED articles for the public frontend.
     */
    public function index()
    {
        $articles = Article::where('is_published', true) // This line filters for published articles
                            ->with('author:id,name')
                            ->latest('published_at')
                            ->get();
        
        // Transform image URLs to full URLs for frontend consumption
        $articles->transform(function ($article) {
            if ($article->image_url) {
                $article->image_url = asset($article->image_url);
            }
            return $article;
        });
        
        return response()->json($articles);
    }

    /**
     * Display a listing of ALL articles for the admin panel.
     */
    public function indexAdmin()
    {
        $articles = Article::with('author:id,name')->latest()->get(); // This line gets ALL articles
        
        // Transform image URLs to full URLs for admin panel
        $articles->transform(function ($article) {
            if ($article->image_url) {
                $article->image_url = asset($article->image_url);
            }
            return $article;
        });
        
        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $this->ensureUserIsAdmin($request);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_published' => 'required|in:0,1',
        ]);
        $validated = $validator->validated();

        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $counter = 1;
        while (Article::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $imageUrl = null;
        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('articles', 'public');
            $imageUrl = Storage::url($path);
        }

        $article = Article::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'category' => $validated['category'],
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'image_url' => $imageUrl,
            'is_published' => $validated['is_published'] == '1',
            'published_at' => ($validated['is_published'] == '1') ? now() : null,
            'user_id' => $request->user()->id,
        ]);

        // Transform image URL to full URL for response
        if ($article->image_url) {
            $article->image_url = asset($article->image_url);
        }

        return response()->json($article, 201);
    }

    public function show(Article $article)
    {
        // Transform image URL to full URL for response
        if ($article->image_url) {
            $article->image_url = asset($article->image_url);
        }
        
        return response()->json($article);
    }

    public function update(Request $request, Article $article)
    {
        $this->ensureUserIsAdmin($request);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_published' => 'required|in:0,1',
        ]);
        $validated = $validator->validated();

        $slug = Str::slug($validated['title']);
        if (Article::where('slug', $slug)->where('id', '!=', $article->id)->exists()) {
            $slug = $slug . '-' . strtolower(Str::random(4));
        }

        $imageUrl = $article->image_url;
        if ($request->hasFile('image_file')) {
            if ($article->image_url) {
                // Extract relative path from full URL for deletion
                $relativePath = str_replace(asset(''), '', $article->image_url);
                $relativePath = Str::after($relativePath, '/storage/');
                Storage::disk('public')->delete($relativePath);
            }
            $path = $request->file('image_file')->store('articles', 'public');
            $imageUrl = Storage::url($path);
        }

        $article->update([
            'title' => $validated['title'],
            'slug' => $slug,
            'category' => $validated['category'],
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'image_url' => $imageUrl,
            'is_published' => $validated['is_published'] == '1',
            'published_at' => ($article->published_at === null && $validated['is_published'] == '1') ? now() : $article->published_at,
        ]);

        // Transform image URL to full URL for response
        if ($article->image_url) {
            $article->image_url = asset($article->image_url);
        }

        return response()->json($article);
    }

    public function destroy(Article $article)
    {
        if (!request()->user() || !request()->user()->is_admin) {
            abort(403, 'This action is unauthorized.');
        }
        
        // Delete associated image file if it exists
        if ($article->image_url) {
            $relativePath = str_replace(asset(''), '', $article->image_url);
            $relativePath = Str::after($relativePath, '/storage/');
            Storage::disk('public')->delete($relativePath);
        }
        
        $article->delete();
        return response()->json(null, 204);
    }
}