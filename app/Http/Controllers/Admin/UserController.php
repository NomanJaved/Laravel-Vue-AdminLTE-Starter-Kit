<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        // Fetch users and return them
        $users = User::latest()->get();
//        dd(response()->json($users));
        return response()->json($users);
    }

    public function store()
    {
        return $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => bcrypt(request('password')),
        ]);
    }
}
