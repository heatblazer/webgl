import os
import sys
'''
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -0.980785 -0.195090 -1.000000
vertex -0.831470 0.555570 -1.000000
vertex -0.195090 0.980785 -1.000000
'''
class Utils(object):
    """ Utulity functions - static class """
    sresult = [] 
    @staticmethod
    def is_json(d):
        """poorman validator of possible json """
        if d is None:
            return False
        d = str(d)
        return d[0] == '{' and d[len(d)-1] == '}'

    @staticmethod
    def unlink(fname):
        pass

    @staticmethod 
    def rmdir(dir_path):
        pass


    @staticmethod
    def getListOfFiles(dirName, opt=None):
        # create a list of file and sub directories 
        # names in the given directory 
        listOfFile = os.listdir(dirName)
        allFiles = list()
        for entry in listOfFile:            
            fullPath = os.path.join(dirName, entry)                
            # If entry is a directory then get the list of files in this directory 
            if os.path.isdir(fullPath):
                allFiles = allFiles + Utils.getListOfFiles(fullPath, opt)
            else:
                if opt is not None and opt(fullPath) is False:
                    allFiles.append(fullPath)
                elif opt is None:
                    allFiles.append(fullPath)
                
        return allFiles


    @staticmethod
    def home_dir():
        return os.path.dirname(os.path.realpath(__file__))


    @staticmethod
    def home():
        os.chdir(os.path.dirname(os.path.realpath(__file__)))
        return os.path.dirname(os.path.realpath(__file__))


    @staticmethod
    def dir_exists_ex(path, wdata=True):
        """wdata: mark False if only check for pathname, or default for path w contents"""
        res = False
        if os.path.isdir(path):
            if wdata is True:              
                res = len(os.listdir(path)) > 1
            res = True
        return res
    

    @staticmethod
    def find_file(dir, match):
        listOfFile = os.listdir(dir)
        allfiles = list()
        for entry in listOfFile:
            fullpath = os.path.join(dir, entry)
            if entry == match:
                Utils.sresult.append(fullpath)
            elif os.path.isdir(fullpath):
                allfiles = allfiles + Utils.find_file(fullpath, match)
            else:
                allfiles.append(fullpath)
        return allfiles




class VTXData:

    def __init__(self, norm=[]) -> None:
        pass

if __name__ == "__main__":
    if False:
        with open(sys.argv[1], "r") as  fp:
            while True:
                next = fp.readline()
                if not next:
                    break
                if "facet " in next:
                    spl = next.split(" ")
                    data.append(spl[2])
                    data.append(spl[3])
                    data.append(spl[4])
                elif "vertex" in next:
                    spl = next.split(" ")
                    vtx.append(spl[1])
                    vtx.append(spl[2])
                    vtx.append(spl[3])
                        
        ndata = ", ".join(data)
        vdata = ", ".join(vtx)
        final = str("var points=[%s];\r\n" % ndata)
        vertices = str("var points=[%s];\r\n" % vdata)
        print(vertices)
    else:

        meshdb = []
        meshdb.append(str("var meshdb = {"))
        meshesh = Utils.getListOfFiles("{}/{}".format(Utils.home(), "assets"))
        for m in meshesh:
            spl = m.split("/")[-1].split(".")[0]
            print(spl)
            meshdb.append ("{} : [ ".format(spl))
            with open(m, "r") as  fp:
                vtx = []
                norm = []
                while True:
                    next = fp.readline()
                    if not next:
                        break
                    if "normal " in next:
                        spl = next.split(" ")
                        norm.append(spl[-3])
                        norm.append(spl[-2])
                        norm.append(spl[-1])
                    elif "vertex" in next:
                        spl = next.split(' ')
                        vtx.append(spl[-3])
                        vtx.append(spl[-2])
                        vtx.append(spl[-1])
                allvtx = ", ".join(vtx)
                meshdb.append(allvtx)
                meshdb.append("],")
        meshdb.append("};")
        with open("meshdb.js", "w") as fp:
            tostr = ' '.join(str(elem) for elem in meshdb)
            fp.write(tostr)
        print("finished!")


