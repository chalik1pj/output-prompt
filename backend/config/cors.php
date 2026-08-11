<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // false karena auth admin memakai Sanctum Bearer token (header Authorization),
    // bukan cookie session -> tidak butuh credentials cross-origin.
    'supports_credentials' => false,
];
