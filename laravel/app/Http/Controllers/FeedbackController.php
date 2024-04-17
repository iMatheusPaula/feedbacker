<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class FeedbackController extends Controller
{
    public function getSummary()
    {
        $userLogged = Auth::id();
        $feedbacks = [
            "all" => Feedback::all()->where('fingerprint', $userLogged)->count(),
            "issue" => Feedback::all()->where('fingerprint', $userLogged)->where('type', 'ISSUE')->count(),
            "idea" => Feedback::all()->where('fingerprint', $userLogged)->where('type', 'IDEA')->count(),
            "other" => Feedback::all()->where('fingerprint', $userLogged)->where('type', 'OTHER')->count()
        ];
        return response()->json($feedbacks, Response::HTTP_OK);
    }

    public function getAll(Request $request)
    {
        $userLogged = Auth::id();
        /*
         * FILTRAR MELHOR
         */
        $type = strtoupper(filter_var($request->query("type"), FILTER_DEFAULT));
        if(!$type){
            $feedbacks = Feedback::all()->where('fingerprint', $userLogged);
        }
        else{
            $feedbacks = Feedback::all()->where('fingerprint', $userLogged)->where('type', $type);
        }
        return response()->json($feedbacks, Response::HTTP_OK);
    }
}
