from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='skills/')

    def __str__(self):
        return self.name

class Experience(models.Model):
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50)
    company_name = models.CharField(max_length=255)
    job_title = models.CharField(max_length=255)
    job_description = models.TextField()

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"

class Project(models.Model):
    project_name = models.CharField(max_length=200)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)  # Allow null for ongoing projects
    technologies = models.CharField(max_length=255)
    project_photo = models.ImageField(upload_to='project_photos/', null=True, blank=True)
    project_link = models.URLField(null=True, blank=True)
    github_link = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.project_name

class Certification(models.Model):
    month_year = models.CharField(max_length=20, null=True, blank=True)
    certificate_name = models.CharField(max_length=255)
    issued_by = models.CharField(max_length=255)
    certificate_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.certificate_name} - {self.issued_by}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject
