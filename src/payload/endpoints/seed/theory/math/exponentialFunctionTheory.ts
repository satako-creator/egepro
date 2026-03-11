import {
  createHeading,
  createParagraph,
  createList,
  createRichText,
  createEquationBlockNode,
} from '../../helpers/helpers'
import type { LexicalRichText } from '../../helpers/helpers'

export const exponentialFunctionTheory = (): LexicalRichText =>
  createRichText([
    // 1. Определение
    createHeading('h2', 'Определение'),
    createParagraph(
      'Показательная функция — это функция вида y = a^x, где a — основание степени, при этом a > 0 и a ≠ 1.',
    ),
    createEquationBlockNode('y = a^x', 'Общий вид показательной функции'),

    // 2. Свойства степени
    createHeading('h2', 'Свойства степени'),
    createParagraph(
      'Все свойства показательной функции опираются на свойства степеней (для a > 0, a ≠ 1 и любых действительных x, y).',
    ),
    createEquationBlockNode(
      'a^x \\cdot a^y = a^{x + y}',
      'Умножение степеней с одинаковым основанием',
    ),
    createEquationBlockNode(
      '\\frac{a^x}{a^y} = a^{x - y}',
      'Деление степеней с одинаковым основанием',
    ),
    createEquationBlockNode('(a^x)^y = a^{x \\cdot y}', 'Возведение степени в степень'),
    createEquationBlockNode('(ab)^x = a^x \\cdot b^x', 'Степень произведения'),
    createEquationBlockNode('\\left(\\frac{a}{b}\\right)^x = \\frac{a^x}{b^x}', 'Степень частного'),
    createEquationBlockNode('a^{-x} = \\frac{1}{a^x}', 'Отрицательная степень'),
    createEquationBlockNode('a^0 = 1', 'Нулевая степень (a \\neq 0)'),

    // 3. Свойства показательной функции
    createHeading('h2', 'Свойства показательной функции y = a^x'),
    createParagraph('Основные факты о графике и значениях функции:'),
    createEquationBlockNode('D(f) = \\mathbb{R}', 'Область определения: все действительные числа'),
    createEquationBlockNode('E(f) = (0; +\\infty)', 'Область значений: только положительные числа'),
    createEquationBlockNode(
      'a^0 = 1 \\Rightarrow (0; 1) \\in \\text{графике}',
      'График всегда проходит через точку (0; 1)',
    ),
    createParagraph(
      'Ось Ox является горизонтальной асимптотой: график стремится к 0, но не пересекает ось абсцисс.',
    ),
    createParagraph(
      'Монотонность: если a > 1, функция возрастает; если 0 < a < 1, функция убывает.',
    ),

    // 4. Схема решения показательных уравнений
    createHeading('h2', 'Схема решения показательных уравнений'),
    createEquationBlockNode('a^{f(x)} = a^{g(x)}', 'Уравнения вида'),
    createParagraph(
      'Шаги решения: приводим к одному основанию, затем приравниваем показатели и решаем алгебраическое уравнение.',
    ),
    createEquationBlockNode(
      'a^{f(x)} = a^{g(x)} \\Rightarrow f(x) = g(x)',
      'Переход от показательного уравнения к алгебраическому',
    ),
    createParagraph('Уравнения вида'),
    createHeading('h3', 'Сведение к квадратному уравнению'),

    createParagraph('Уравнения вида  решаются заменой '),

    createEquationBlockNode('A \\cdot a^{2x} + B \\cdot a^x + C = 0'),

    createEquationBlockNode('t = a^x, t > 0.'),

    createEquationBlockNode(
      'A \\cdot a^{2x} + B \\cdot a^x + C = 0',
      'Общий вид «квадратного» показательного уравнения',
    ),
    createEquationBlockNode(
      't = a^x,\\; t > 0',
      'Замена переменной для сведения к квадратному уравнению',
    ),

    // 5. Схема решения показательных неравенств
    createHeading('h2', 'Схема решения показательных неравенств'),
    createEquationBlockNode('a^{f(x)} > a^{g(x)}', 'Неравенства вида'),

    createParagraph(
      'Сравнивая степени, важно учитывать, возрастает или убывает показательная функция.',
    ),
    createEquationBlockNode(
      'a > 1,\\; a^{f(x)} > a^{g(x)} \\Rightarrow f(x) > g(x)',
      'Для возрастающей функции знак неравенства сохраняется',
    ),
    createEquationBlockNode(
      '0 < a < 1,\\; a^{f(x)} > a^{g(x)} \\Rightarrow f(x) < g(x)',
      'Для убывающей функции знак неравенства меняется на противоположный',
    ),
    createParagraph(
      'Если основания разные, их стараются привести к одному основанию с помощью свойств степеней.',
    ),
  ])
