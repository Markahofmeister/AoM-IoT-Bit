#!/bin/bash

OUT_DIR=./out
if [ ! -d "$OUT_DIR" ]; then
    echo "Creating output directory"
    mkdir -p $OUT_DIR
fi

echo "Generating message layer protobufs for python..."
PYTHON_OUT_DIR=$OUT_DIR/python
if [ ! -d "$PYTHON_OUT_DIR" ]; then
    echo "Creating Python output directory"
    mkdir -p $PYTHON_OUT_DIR
fi
protoc -I $PWD --python_out=$PYTHON_OUT_DIR $PWD/*.proto

echo "Generating protobufs for Javascript..."
JS_OUT_DIR=$OUT_DIR/js
if [ ! -d "$JS_OUT_DIR" ]; then
    echo "Creating Javascript output directories"
    mkdir -p $JS_OUT_DIR
fi
protoc -I $PWD --js_out=import_style=commonjs,binary:$JS_OUT_DIR $PWD/*.proto
pbjs -t static-module $PWD/*.proto > $JS_OUT_DIR/MessageLayer.js


echo "Generating message layer protobufs for C..."
C_OUT_DIR=$OUT_DIR/c
if [ ! -d "$C_OUT_DIR" ]; then
    echo "Creating C output directory"
    mkdir -p $C_OUT_DIR
fi
python3 nanopb/generator/nanopb_generator.py -I $PWD $PWD/*.proto -D $C_OUT_DIR