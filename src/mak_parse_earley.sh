read -p 'Langname: ' lang
read -p 'Grammarfile: ' gm
read -p 'inputfile: ' t
shs = "${lang}.sh"
act = "${lang}.ts"
json = "${lang}.json"
touch $shs
touch $act
touch $json
echo "deno run --allow-read ${act} >> ${json}" >> $shs
echo "// @ts-nocheck" >> $act
echo "import * as fs from './make_json.ts';" >> $act
echo "var k = fs.read_file_init_('${gm}')" >> $act

