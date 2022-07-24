from django.db import models


class Items(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='img/')

    def __str__(self):
        return self.title
