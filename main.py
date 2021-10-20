import os
import eel
import platform
import datetime
from pytube import YouTube
from Converter import *

eel.init('web')

@eel.expose
def youtube(link):
    
    data = datetime.datetime.now()
    print(f"{data.strftime('%H:%M:%S')} [ BUSCANDO VIDEO ]")
    try:
        yt = YouTube(link)
    except:
        data = datetime.datetime.now()
        print(f"{data.strftime('%H:%M:%S')} [ LINK INVALIDO ]")
        eel.invalidLink()
        return False
    #A busca das streams pode retornar falha, repetir até o mesmo executar corretamente
    while True:
        try:
            a = yt.streams.filter(progressive=True).order_by('resolution').desc()
            # a = yt.streams.order_by('resolution').desc()
            data = datetime.datetime.now()
            print(f"{data.strftime('%H:%M:%S')} [ SUCESSO AO BUSCAR RESOLUÇOES ]")
            break
        except:
            data = datetime.datetime.now()
            print(f"{data.strftime('%H:%M:%S')} [ FALHA AO BUSCAR RESOLUÇOES... ]")

    dados = {}
    formatos = []

    formatos.append({"itag":1400,"res":"--","fps":"--","mime_type":"audio/mp3"})

    dados['formatos'] = formatos
    dados['title'] = yt.title
    dados['thumbnail'] = yt.thumbnail_url

    return dados

def on_progress(a,b,c):
    fileLeft = ((a.filesize ) / (1024**2)) - ((c/ (1024**2)))
    fileLeft = int(fileLeft)
    downloaded = int(c / (1024**2))
    eel.getFileLeft(downloaded,fileLeft)

def on_complete(stream, filePath):
    eel.downloadCompleted()

@eel.expose
def downloadItag(link,itag):

    if(itag == 1400):
        realItag = 1400
        itag = 18

    yt = YouTube(link,on_progress,on_complete)
    while True:
        try:
            stream = yt.streams.get_by_itag(itag)

            eel.getFileSize(int((stream.filesize / (1024**2))))
            downloadPath = os.getcwd() + "\\"+ yt.title.replace(" ", "_") + ".mp4"

            path = stream.download('downloads')
            break
        except Exception as e:
            data = datetime.datetime.now()
            print(f"{data.strftime('%H:%M:%S')} [FALHA]:", e)

    if(platform.system() == "Windows"):
        pathParts = path.split("\\")
        fileName = pathParts.pop(-1)
        dirPath = '\\'.join(pathParts)
    else:
        pathParts = path.split("/")
        fileName = pathParts.pop(-1)
        dirPath = '/'.join(pathParts)

    if('realItag' in locals()):
        a = Converter(dirPath,fileName)
        a.convert()
        return [dirPath,fileName]
    else:
        return [dirPath,fileName]

@eel.expose
def openLocation(location, fileName = ' '):
    # Atualizar para suportar linux & windows
    pass
    """ # print(fileName)
    if(len(fileName)<=0):
        path = os.path.realpath(location)
    else:
        path = os.path.realpath(location + "\\" + fileName)
    os.startfile(path, 'open') """


eel.start('web/index.html')
