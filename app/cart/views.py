# cart/views.py
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    ...


@csrf_exempt  # temporarily if CSRF still fails
def delete_item(request, id):
    if request.method == "DELETE":
        # delete logic here
        return JsonResponse({"success": True})
    return JsonResponse({"error": "Method not allowed"}, status=405)
