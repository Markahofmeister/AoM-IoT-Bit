#ifndef TOKENIZER_H
#define TOKENIZER_H

extern const char Tokenizer_NullTerminator;

typedef struct
{
    char *Current;
    char EndOfString;
} Tokenizer_Context_t;

char *Tokenizer_Tokenize(Tokenizer_Context_t *const context, char *const string, const char delimiter);

#endif