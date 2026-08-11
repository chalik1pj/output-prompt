<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteWidget;
use Illuminate\Http\Request;

class SiteWidgetController extends Controller
{
    public function index(Request $request)
    {
        $query = SiteWidget::orderBy('widget_type')->orderBy('display_order');

        if ($request->filled('type')) {
            $query->where('widget_type', $request->string('type'));
        }

        return response()->json($query->paginate($request->integer('per_page', 30)));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'widget_type' => 'required|in:testimonial,partner,gallery_image,campus_stat',
            'title' => 'nullable|string|max:200',
            'subtitle' => 'nullable|string|max:200',
            'quote' => 'nullable|string',
            'value' => 'nullable|integer',
            'image_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'link_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'display_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $widget = SiteWidget::create($data);

        return response()->json(['data' => $widget], 201);
    }

    public function update(Request $request, SiteWidget $widget)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:200',
            'subtitle' => 'nullable|string|max:200',
            'quote' => 'nullable|string',
            'value' => 'nullable|integer',
            'image_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'link_url' => ['nullable', 'max:500', 'regex:/^(https?:\/\/|\/)/'],
            'display_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $widget->update($data);

        return response()->json(['data' => $widget]);
    }

    public function destroy(SiteWidget $widget)
    {
        $widget->delete();

        return response()->json(['message' => 'Widget dihapus.']);
    }
}
