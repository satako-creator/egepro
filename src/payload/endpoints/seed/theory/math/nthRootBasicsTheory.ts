import {
  createHeading,
  createParagraph,
  createRichText,
  createEquationBlockNode,
} from '../../helpers/helpers'
import type { LexicalRichText } from '../../helpers/helpers'

export const nthRootBasicsTheory = (): LexicalRichText =>
  createRichText([
    createHeading('h2', '1. Определение корня n-й степени'),
    createParagraph(
      'Арифметическим корнем натуральной степени n из неотрицательного числа a называется неотрицательное число b, n-я степень которого равна a.',
    ),
    createEquationBlockNode('a^{1/n} = b \\iff b^n = a', 'Определение корня n-й степени'),
    createEquationBlockNode('n \\in \\mathbb{N},\\; n \\geq 2,\\; a \\geq 0,\\; b \\geq 0'),
    createHeading('h3', 'Чётные и нечётные степени'),
    createParagraph(
      'Для нечётной степени корень можно извлекать из любого числа, но арифметическим корнем считается только неотрицательный результат.',
    ),
    createEquationBlockNode('n = 3, 5, 7, \\dots', 'Нечётные степени'),
    createParagraph(
      'Для чётной степени подкоренное выражение должно быть неотрицательным, и результат корня всегда неотрицателен.',
    ),
    createEquationBlockNode('n = 2, 4, 6, \\dots', 'Чётные степени'),
    createEquationBlockNode('a \\geq 0,\\; \\sqrt[n]{a} \\geq 0'),

    createHeading('h2', '2. Свойства арифметического корня'),
    createEquationBlockNode('a \\geq 0,\\; b \\geq 0,\\; n, k \\in \\mathbb{N},\\; n, k \\geq 2'),

    createHeading('h3', 'Корень из произведения'),
    createEquationBlockNode('\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}'),
    createParagraph('Корень из произведения равен произведению корней.'),

    createHeading('h3', 'Корень из частного'),
    createEquationBlockNode(
      '\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}},\\quad b > 0',
    ),
    createParagraph('Корень из частного равен частному корней при b > 0.'),

    createHeading('h3', 'Возведение корня в степень'),
    createEquationBlockNode('(\\sqrt[n]{a})^{m} = a^{m/n}'),
    createParagraph('Возведение корня в степень связывает корень с дробным показателем степени.'),

    createHeading('h3', 'Извлечение корня из корня'),
    createEquationBlockNode('\\sqrt[k]{\\sqrt[n]{a}} = \\sqrt[nk]{a}'),
    createParagraph(
      'Последовательное извлечение корней сводится к одному корню с произведением показателей.',
    ),

    createHeading('h3', 'Связь со степенью'),
    createEquationBlockNode('\\sqrt[n]{a^{m}} = a^{m/n}'),
    createParagraph(
      'Эта формула является основной при переходе от корней к степеням с дробным показателем.',
    ),

    createHeading('h3', 'Вынесение множителя из-под корня'),
    createParagraph('Для чётных n арифметический корень из степени даёт модуль числа:'),
    createEquationBlockNode('\\sqrt[n]{a^{n}} = |a|,\\quad n \\text{ чётное}'),
    createParagraph('Для нечётных n знак сохраняется:'),
    createEquationBlockNode('\\sqrt[n]{a^{n}} = a,\\quad n \\text{ нечётное}'),
    createParagraph('Пример для чётного n:'),
    createEquationBlockNode('\\sqrt[2]{(-5)^2} = \\sqrt{25} = 5 = |-5|'),
    createParagraph('Пример для нечётного n:'),
    createEquationBlockNode('\\sqrt[3]{(-2)^3} = \\sqrt[3]{-8} = -2'),

    createHeading('h2', '3. Действия с корнями в задачах'),

    createHeading('h3', 'Внесение множителя под знак корня'),
    createEquationBlockNode('c \\cdot \\sqrt[n]{a} = \\sqrt[n]{c^{n} \\cdot a},\\quad c \\geq 0'),
    createParagraph('Если c < 0 и n нечётное, знак минус остаётся перед корнем.'),
    createEquationBlockNode(
      '-c \\cdot \\sqrt[n]{a} = -\\sqrt[n]{c^{n} a},\\quad c > 0,\\; n \\text{ нечётное}',
    ),

    createHeading('h3', 'Сравнение корней'),
    createParagraph(
      'Для сравнения корней одинаковой степени достаточно сравнить их подкоренные выражения.',
    ),
    createEquationBlockNode('\\sqrt[n]{a} \\;\\text{и}\\; \\sqrt[n]{b},\\; a, b \\geq 0'),
    createEquationBlockNode('a > b \\iff \\sqrt[n]{a} > \\sqrt[n]{b}'),
    createEquationBlockNode('y = x^{1/n}', 'Функция возрастающая при x ≥ 0'),

    createHeading('h3', 'Упрощение выражений с корнями'),
    createParagraph(
      'При упрощении выражений с корнями стараются вынести множители из-под корня, сократить степени и избавиться от корней в знаменателе.',
    ),
    createParagraph(
      'Чтобы избавиться от иррациональности в знаменателе, числитель и знаменатель умножают на сопряжённое выражение или на недостающий корень.',
    ),
  ])
