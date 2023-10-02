<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task; // Asegúrate de importar el modelo Task

class TaskController extends Controller
{
    // Obtener todas las tareas
    public function index()
    {
        $tasks = Task::all();
        return response()->json(['tasks' => $tasks]);
    }

    // Crear una nueva tarea
    public function store(Request $request)
    {
        $task = new Task();
        $task->title = $request->input('title');
        $task->description = $request->input('description'); // Si tienes un campo de descripción
        $task->save();

        return response()->json(['task' => $task], 201);
    }

    // Obtener una tarea específica por su ID
    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        return response()->json(['task' => $task]);
    }

    // Actualizar una tarea específica por su ID
    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        $task->title = $request->input('title');
        $task->description = $request->input('description'); // Si tienes un campo de descripción
        $task->save();

        return response()->json(['task' => $task]);
    }

    // Eliminar una tarea específica por su ID
    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Tarea eliminada']);
    }
}
