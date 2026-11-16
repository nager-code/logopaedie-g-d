import subprocess, sys
from PIL import Image
names = sys.argv[2:]; cols = int(sys.argv[1]); W = 420
rows = (len(names)+cols-1)//cols
c = Image.new('RGBA', (cols*W, rows*W), 'white')
for i, n in enumerate(names):
    subprocess.run(['rsvg-convert', '-w', str(W), n+'.svg', '-o', n+'.png'], check=True)
    im = Image.open(n+'.png').convert('RGBA'); c.paste(im, ((i%cols)*W, (i//cols)*W), im)
c.save('sheet.png')
