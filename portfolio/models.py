from django.db import models

class Experience(models.Model):
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50)
    company_name = models.CharField(max_length=255)
    job_title = models.CharField(max_length=255)
    job_description = models.TextField()

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject
