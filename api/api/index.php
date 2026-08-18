<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

use App\Http\Response;

applyCors();
Response::json(['success' => true, 'message' => 'FaruTech API operativa.', 'data' => ['version' => '1.0']]);
