font_file=文字
json_file=fonts.json

json="{"
while read line; do
    convert +antialias -font ~/.fonts/msgothic.ttc -pointsize 16 label:"$line" -extent 16x16 temp.png
    
    ary="["
    n=0
    for i in `./readfont`; do
        ary="$ary$i"
        if [ $n -ne 15 ]; then
            ary="$ary, "
        fi
        n=$(($n+1))
    done
    ary="$ary]"
    json="$json\"$line\":$ary,"
done < $font_file
echo $json | sed '$s/.$//' > $json_file
echo "}" >> $json_file