<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'picture' => ['nullable', 'mimes:png,jpg,jpeg', 'image'],
            'title' => ['required', 'string', 'min:3'],
            'teaser' => ['required', 'string', 'min:3'],
            'body' => ['required', 'string', 'min:3'],
            'category_id' => ['required', 'exists:categories,id'],
            'tags' => ['required', 'array'],
            'status' => ['required', 'numeric'],
        ];
    }
}
