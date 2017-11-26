import base64
import fnmatch
import os

def arbolDir(rootDir):
    dir = []
    archivos = []
    dirArchivos = []
    for dirName, subdirList, fileList in os.walk(rootDir, topdown=False):
        dir.append(dirName)
     #   print dirName, subdirList, fileList
        for items in fnmatch.filter(fileList, "*"):
    #       print '==>', items
    #       archivos.append(fileList)
           dirArchivos.append(dir + archivos)
    return  dir

def subDirectorio(rootDir):
    subdir = []
    for subdirList in os.walk(rootDir, topdown=False):
        subdir.append((subdirList))
    return subdir

def listaArchivo(rootDir):
    lisArchivo = []
    for fileList in os.walk(rootDir, topdown=False):
    #    print "fileList>>>>>", fileList
        lisArchivo.append((fileList))
    return lisArchivo

def leerArchivo(rootDir, archivo):
    print "LeeArchivo============>", rootDir, archivo
    fh = open(rootDir + "/" + archivo)
    contenido = fh.read()
 #   print contenido
    fh = open(rootDir + "/" + archivo)
    contenido = fh.readlines()
 #   print contenido
    contenido = ''
    fh = open(rootDir + "/" + archivo)
    while True:
        line = fh.readline()
        contenido += line
        if line == '':
            break

    if contenido != '':
   #     rutatmp = "/var/local_fs/files"
        rutatmp = rootDir
        validaExisteRuta(rutatmp)
        rutaArchivo = rutatmp + '/' + 'primer1.pdf'
        f = open(rutaArchivo, mode='wb')
        f.write(rutaArchivo)
        f.close()
    #print contenido
    # Para todos los casos:
    fh.close()

def validaExisteRuta(ruta):
    if not os.path.exists(ruta):
        os.makedirs(ruta)
    return

