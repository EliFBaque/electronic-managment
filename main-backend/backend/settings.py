# This bring the settings from the local_settings.py file

try:
    from .local_settings import *
except ImportError:
    pass