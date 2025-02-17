# from django.http import JsonResponse
# from django.utils.deprecation import MiddlewareMixin

# import os

# ALLOWED_USERNAME = os.environ.get('ALLOWED_USERNAME', 'admin_user')  # Cambia esto al usuario permitido

# class RestrictUserMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         if request.user.is_authenticated and request.user.username != ALLOWED_USERNAME:
#             return JsonResponse({'error': 'Access denied'}, status=403)