<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Batasi route ke role admin tertentu. Pakai sebagai `->middleware('admin.role:super_admin')`.
 */
class EnsureAdminRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (! in_array($request->user()->role, $roles, true)) {
            abort(Response::HTTP_FORBIDDEN, 'Anda tidak memiliki akses ke resource ini.');
        }

        return $next($request);
    }
}
