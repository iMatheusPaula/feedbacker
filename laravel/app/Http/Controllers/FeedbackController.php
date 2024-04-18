<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        /* TYPE PARAM */
        $type = strtoupper(filter_var($request->query("type"), FILTER_SANITIZE_SPECIAL_CHARS));
        /* LIMIT PARAM */
        $limit = filter_var(
            $request->query("limit") ? $request->query("limit") : 5,
            FILTER_SANITIZE_NUMBER_INT);
        /* OFFSET PARAM */
        $offset = filter_var(
            $request->query("offset") ? $request->query("offset") : 0,
            FILTER_SANITIZE_NUMBER_INT);
        if(!$type || $type == "ALL"){
            $feedbacks = DB::table('feedbacks')
                ->where('fingerprint', $userLogged)
                ->offset($offset)
                ->limit($limit)
                ->get();
        }
        else{
            $feedbacks = DB::table('feedbacks')
                ->where('fingerprint', $userLogged)
                ->where('type', $type)
                ->offset($offset)
                ->limit($limit)
                ->get();
        }
        return response()->json($feedbacks, Response::HTTP_OK);
    }
}
