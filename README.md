# nostraint
## Status
:red_circle: not released yet. Development ongoing.
## What is it
**Nostraint** is a javascript library that helps you perform operations on numbers without worrying about overflow related constraints.
It offers a set of functions that handle numbers in their string version.

**Nostraint** will be released under the MIT license and is tested by building with the following Nodejs versions : `14.x`, `16.x` and `18.x` 

## Features
**Nostraint** can :

|                | Unsigned Integers        | Signed Integers          | ...               |
|----------------|--------------------------|--------------------------|-------------------|
| addition       | :heavy_check_mark:       | :heavy_check_mark:       | :black_circle:    |
| subtraction    | :heavy_check_mark:       | :heavy_check_mark:       | :black_circle:    |
| multiplication | :heavy_check_mark:       | :heavy_check_mark:       | :black_circle:    |
| division       | :heavy_multiplication_x: | :heavy_multiplication_x: | :black_circle:    |
| comparison     | :black_circle:           | :black_circle:           | :black_circle:    |
| modulo         | :black_circle:           | :black_circle:           | :black_circle:    |
| ...            | :black_circle:           | :black_circle:           | :black_circle:    |

Legend:
- :heavy_check_mark: : done
- :heavy_multiplication_x: : not done yet but planned
- :black_circle: : not done nor planned / TBD

## Installation
Coming soon

## Performances
Performances are measured by executing one million times the same call with the same arguments.
Done by executing `npm run perf`

_On safe integers (meaning `< Number.MAX_SAFE_INTEGER` which is `9007199254740991`), less than 7 digits_

|                | exec time (ms) :watch: |
|----------------|------------------------|
| addition       | 1138.8901              |
| subtraction    | 654.0109               |
| multiplication | 650.5365               |

_On unsafe integers (meaning `> Number.MAX_SAFE_INTEGER` which is `9007199254740991`), approx. 55 digits_

|                                | exec time (ms) :watch: |
|--------------------------------|------------------------|
| addition - only positive       | 4219.9753              |
| addition - only negative       | 3640.6310              |
| addition - mix                 | 3857.0701              |
| subtraction - only positive    | 4960.0909              |
| subtraction - only negative    | 4990.6909              |
| subtraction - mix              | 3483.5355              |
| multiplication - only positive | 33070.5006             |
| multiplication - only negative | 27750.5147             |
| multiplication - mix           | 28293.5184             |

## Algorithms
### Addition - Subtraction
Simple "addition / subtraction with carry" implementation, with a little twist :
these operations on integers are possible as long as numbers at play do not exceed `Number.MAX_SAFE_INTEGER` which is `9007199254740991`.
As we can see, this number is 16 digits long. Moreover, classic addition with carry presents an interesting property : the carry can never exceeds 1.

_Example : `999 + 999 = 1 998`_

As we can see, even when the operands are at max value for a given number of digits, carry is still 1. So, to benefit from the native implementation
of arithmetics in Javascript on integers, we simply separate input strings in packets of `MAX_DIGITS - 1`, which is 15 digits. Then, we add/subtract packet by packet and
report the carry when necessary.

### Multiplication


