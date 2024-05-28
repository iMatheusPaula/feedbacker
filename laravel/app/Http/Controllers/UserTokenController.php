<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class UserTokenController extends Controller
{
    public function generate(User $user)
    {
        $idUser = Auth::user()->id;
        User::where('id', $idUser)->update(['api_token' => Str::random(60)]);
        return response()->json(Response::HTTP_OK);
    }
    public function checkExistence(string $apikey): \Illuminate\Http\JsonResponse
    {
        $apiKeyT = filter_var($apikey,FILTER_SANITIZE_SPECIAL_CHARS);
        if(User::all()->where('api_token', $apiKeyT)->count()){
            return response()->json(null,Response::HTTP_OK);
        }
        else{
            return response()->json(null,Response::HTTP_NOT_FOUND);
        }
    }
}
