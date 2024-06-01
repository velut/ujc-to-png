# ujc file format

| Section              | Size in bytes | Notes                                                                                       |
|----------------------|---------------|---------------------------------------------------------------------------------------------|
| File header          | 4             | Always `1A 81 CD 45` for a valid `ujc` file                                                 |
| File format version  | 4             | Currently `00 00 00 01` (version 1 of the `ujc` file format)                                |
| Zero value           | 4             | Fixed value `00 00 00 00`                                                                   |
| Nonogram metadata    | 4             | Contains 24 bits of metadata `00 ?? ?? ??`; see table below                                 |
| Image type           | 4             | `00 00 00 00` for black and white images; `00 00 00 01` for color images                    |
| Image width          | 4             | Width of the nonogram                                                                       |
| Image height         | 4             | Height of the nonogram                                                                      |
| Alternate title size | 1             | Size of the following string bytes or `00` if the string is empty                           |
| Alternate title      | [0, 255]      | Alternate title (e.g., non English title)                                                   |
| Main title size      | 1             | Size of the following string bytes or `00` if the string is empty                           |
| Main title           | [0, 255]      | Main title (e.g., English title)                                                            |
| Author name size     | 1             | Size of the following string bytes or `00` if the string is empty                           |
| Author name          | [0, 255]      | Author name added when sharing the nonogram                                                 |
| Empty string size    | 1             | Fixed value `00`                                                                            |
| Zero value           | 4             | Fixed value `00 00 00 00`                                                                   |
| PNG image data size  | 4             | Size of the following PNG image data                                                        |
| PNG image data       | Variable      | PNG image representing the nonogram; recognizable from the header `89 50 4E 47 0D 0A 1A 0A` |
| Zero value           | 4             | Fixed value `00 00 00 00`                                                                   |

## Metadata bits

     EEEE EEEE T... .... .... CCCC UBUU KKKK
     |       |    |    |    |    |    |    |
    31      24   20   16   12    8    4    0

| Section                          | Size in bits | Bit positions | Notes                                                            |
|----------------------------------|--------------|---------------|------------------------------------------------------------------|
| Empty (E)                        | 8            | [31, 24]      | Currently always empty                                           |
| "Two-line English name" flag (T) | 1            | 23            | `1` if the "Two-line English name" option is true                |
| Number of colors (C)             | 4            | [11, 8]       | Total number of colors including background color, even if white |
| Unknown flag (U)                 | 1            | 7             | Probably linked to flag (B) and colors (C)                       |
| Background color flag (B)        | 1            | 6             | `1` it the color image has a background color                    |
| Unknown flag (U)                 | 1            | 5             |                                                                  |
| Unknown flag (U)                 | 1            | 4             |                                                                  |
| Unknown number (K)               | 4            | [3, 0]        | Probably nonogram kind (e.g., "True nonogram", "Symmetry", etc.) |
| Other bits (.)                   |              |               | Currently unused                                                 |
