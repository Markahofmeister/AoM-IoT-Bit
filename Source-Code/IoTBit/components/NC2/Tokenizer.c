#include <stddef.h>
#include "Tokenizer.h"

#define TOKENIZER_END_OF_STRING_FALSE 0U
#define TOKENIZER_END_OF_STRING_TRUE 1U

const char Tokenizer_NullTerminator = '\0';

char *Tokenizer_Tokenize(Tokenizer_Context_t *const context, char *const string, const char delimiter)
{
    char *start = NULL;

    if (context != NULL)
    {
        if (string != NULL)
        {
            context->Current = string;
            context->EndOfString = TOKENIZER_END_OF_STRING_FALSE;
        }

        if (context->EndOfString == TOKENIZER_END_OF_STRING_FALSE)
        {
            while (*context->Current == delimiter)
            {
                context->Current++;
            }
            start = context->Current;

            while (*context->Current != delimiter && *context->Current != Tokenizer_NullTerminator)
            {
                context->Current++;
            }

            if (*context->Current == Tokenizer_NullTerminator)
            {
                context->EndOfString = TOKENIZER_END_OF_STRING_TRUE;
            }

            *context->Current = Tokenizer_NullTerminator;
            context->Current++;
        }
    }

    return start;
}