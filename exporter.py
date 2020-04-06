import os
import sys


fname = "/home/ilian/gitprojects/webgl/assets/example001.stl"

data = []

if __name__ == "__main__":
    with open(sys.argv[1], "r") as  fp:
        while True:
            next = fp.readline()
            if not next:
                break
            if "facet normal" in next:
                spl = next.split(" ")
                data.append(spl[4])
                data.append(spl[5])
                data.append(spl[6])
                    
    vdata = ", ".join(data)
    final = str("var points=[%s];\r\n" % vdata)
    print(final)


