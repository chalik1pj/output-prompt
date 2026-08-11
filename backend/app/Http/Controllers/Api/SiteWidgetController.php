<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteWidget;
use Illuminate\Http\Request;

class SiteWidgetController extends Controller
{
    public function index(Request $request)
    {
        $query = SiteWidget::active();

        if ($request->filled('type')) {
            $query->ofType($request->string('type'));
        }

        return response()->json(['data' => $query->get()]);
    }
}
