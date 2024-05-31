# ujc file format

| Section              | Size in bytes | Notes                                                                                              |
|----------------------|---------------|----------------------------------------------------------------------------------------------------|
| File header          | 4             | Always `1A 81 CD 45` for a valid `ujc` file                                                        |
| File format version  | 4             | Currently `00 00 00 01` (version 1 of the `ujc` file format)                                       |
| Zero value           | 4             | Fixed value `00 00 00 00`                                                                          |
| Unknown data         | 4             | Contains 24 bits of data `00 ?? ?? ??`; probably flags for puzzle properties (e.g., true nonogram) |
| Image type           | 4             | `00 00 00 00` for black and white images; `00 00 00 01` for color images                           |
| Image width          | 4             |                                                                                                    |
| Image height         | 4             |                                                                                                    |
| Alternate title size | 1             | Size of the following string bytes or `00` if the string is empty                                  |
| Alternate title      | [0, 255]      | Alternate title (e.g., non English title)                                                          |
| Main title size      | 1             | Size of the following string bytes or `00` if the string is empty                                  |
| Main title           | [0, 255]      | Main title (e.g., English title)                                                                   |
| Author name size     | 1             | Size of the following string bytes or `00` if the string is empty                                  |
| Author name          | [0, 255]      | Author name added when sharing the nonogram                                                        |
| Empty string size    | 1             | Fixed value `00`                                                                                   |
| Zero value           | 4             | Fixed value `00 00 00 00`                                                                          |
| PNG image data size  | 4             | Size of the following PNG image data                                                               |
| PNG image data       | Variable      | PNG image representing the nonogram; recognizable from the header `89 50 4E 47 0D 0A 1A 0A`        |
| Zero value           | 4             | Fixed value `00 00 00 00`                                                                          |
