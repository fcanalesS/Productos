#!/usr/bin/python
#-*- coding: utf-8 -*-
########### -*- coding: latin-1 -*-

import datetime
import json
from json import JSONEncoder
import os
import sys

import filepath as filepath
import web


urls = ('/', 'Index',
        '/test', 'Prueba',
        '/tree', 'Tree',
        '/tree-faltantes', 'TreeFaltantes',
        '/tree-result', 'TreeResult',
        '/upload-file', 'UploadFile',
        '/(js|css|json|xml|files)/(.*)', 'Static',
        '/favicon.ico', 'icon'
)

# Create application
app = web.application(urls, locals())


# Add local directories to the system path
include_dirs = ['lib','admin','upload_xml']



for dirname in include_dirs:
  sys.path.append( os.path.dirname(__file__) + '/' + dirname )
  sys.path.insert(0, os.path.dirname(__file__) + '/' + dirname)

static_dir = os.path.abspath(os.path.dirname(__file__)) + "/static"
template_dir = os.path.abspath(os.path.dirname(__file__)) + "/templates"
htmlout = web.template.render(template_dir, base='layout')
archivo_pdf = os.path.abspath(os.path.dirname(__file__)) + "/static/files/"
upload_pdf = os.path.abspath(os.path.dirname(__file__)) + "/static/upload_pdf/"
render_plain = web.template.render(template_dir) #Carga el template sin usar el layout

dbPostgres = web.database(host='lecheros.bcn.cl', dbn='postgres', db='transparencia', user='postgres', pw='postgres')

###Variables Globales
# rootDir = '/home/pcanales/proyectos/test/'
rootDir = static_dir + '/files/'
faltantesDir = static_dir + '/archivosFaltantes/'
class Index():
    def GET(self):
        return htmlout.productos()

class Prueba:
    def GET(self):
        add_row = render_plain.add_row()
        faltantes = render_plain.tabla_faltantes()
        return htmlout.test(add_row, faltantes)

class TreeFaltantes():
    def GET(self):
        import os

        dictFolder = []
        for root, dirs, files in os.walk(faltantesDir):
            for i in dirs:
                aux = {'text': i, 'nodes': []}
                dictFolder.append(aux.copy())
                for j in os.listdir(faltantesDir + i):
                    aux2 = {'text': j, 'path': "files/" + i + "/" + j}
                    aux['nodes'].append(aux2.copy())

        print "***"
        print dictFolder
        print "***"

        web.header('Content-Type', 'application/json')
        return json.dumps(dictFolder)


class Tree():
    def GET(self):
        import os

        dictFolder = []
        for root, dirs, files in os.walk(rootDir):
            for i in dirs:
                aux = {'text': i, 'nodes': []}
                dictFolder.append(aux.copy())
                for j in os.listdir(rootDir + i):
                    aux2 = {'text': j, 'path': "files/" + i + "/" + j }
                    aux['nodes'].append(aux2.copy())

        print "***"
        print dictFolder
        print "***"

        web.header('Content-Type', 'application/json')
        return json.dumps(dictFolder)

class TreeResult:
    def POST(self):
        import sigper
        adb = sigper.SIGPERDB() #conexion a BD

        user_email = "pcanales@bcn.cl"  ###capturar via cookie
        getRUT = adb.searchRut(user_email)

        rut = str(getRUT[1][0]) + str(getRUT[1][1])

        print "Obtengo Rut:", rut

        data = web.input()
        for d in data:
            result = json.loads(d)
        print "*"*20
        print result
#        print "Cantidad de Folder  :", len(result['file'][0]['files']), " Cantidad de Archivos:", len(result['file'])
        i = 0
        j = 0
        for i in range(0, len(result['file'])):
            print "FOLDER==>", result['file'][i]['folder'], " index i: ", i
            for j in range(0, len(result['file'][i]['files'])):
                print "FILE(S)==>", result['file'][i]['files'][j], " index j:", j
            print "*" * 20

#        print result['file'][0]['folder'], result['file'][1]['folder']
        print result['file']
        return "k"

class UploadFile:
    def POST(self):
        print "POST"
        files = web.webapi.rawinput().get("file")
        print files
        print web.webapi.rawinput()
        try:
            for f in files:
                print f
                fout = open(rootDir + '/' + f.filename, 'w')  # creates the file where the uploaded file should be stored
                fout.write(f.file.read())  # writes the uploaded file to the newly created file.
        except:
            fout = open(rootDir + '/' + files.filename, 'w')  # creates the file where the uploaded file should be stored
            fout.write(files.file.read())  # writes the uploaded file to the newly created file.

        raise web.seeother('/')



class Static:
    def GET(self, media, file):
        ext = file.split(".")[-1] # Gather extension
    #    print ">>>>>>>>>>>>>>>>>>>>>", ext, media, file
        cType = {
            "css":"text/css",
            "js":"application/javascript",
            "xml":"text/xml",
            "pdf":"application/pdf"
               }
        try:
            web.header("Content-Type", cType[ext]) # Set the Header
            f = open(static_dir +'/'+ media +'/'+ file, 'r')
            return f.read()
        except:
            return ''

# Process favicon.ico requests
class icon:
    def GET(self):
        raise web.seeother(static_dir + "/favicon.ico")

if __name__ == "__main__":
    app.run()
else:
    application = app.wsgifunc()