<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
