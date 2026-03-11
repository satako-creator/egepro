import {
  createHeading,
  createParagraph,
  createRichText,
  createEquationBlockNode,
} from '../../helpers/helpers'
import type { LexicalRichText } from '../../helpers/helpers'

export const powerGeneralizationTheory = (): LexicalRichText =>
  createRichText([
    createHeading('h2', '1. Степень с целым показателем'),

    createHeading('h3', 'Определения'),
    createHeading('h3', 'Натуральный показатель'),
    createEquationBlockNode(
      'a^n = \\underbrace{a \\cdot a \\cdot \\dots \\cdot a}_{n \\text{ раз}}',
    ),

    createHeading('h3', 'Нулевой показатель'),
    createEquationBlockNode('a^0 = 1, \\quad (a \\neq 0)'),
    createParagraph('Выражение 0^0 считается неопределённым.'),

    createHeading('h3', 'Отрицательный целый показатель'),
    createEquationBlockNode('a^{-n} = \\frac{1}{a^n}, \\quad (a \\neq 0)'),

    createHeading('h3', 'Свойства степени с целым показателем'),
    createParagraph(
      'Для любых a \\neq 0, b \\neq 0 и любых целых m, n выполняются следующие свойства:',
    ),
    createEquationBlockNode('a^m \\cdot a^n = a^{m+n}', 'Произведение'),
    createEquationBlockNode('\\frac{a^m}{a^n} = a^{m-n}', 'Частное'),
    createEquationBlockNode('(a^m)^n = a^{m \\cdot n}', 'Степень степени'),
    createEquationBlockNode('(ab)^n = a^n \\cdot b^n', 'Степень произведения'),
    createEquationBlockNode('\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}', 'Степень частного'),

    createHeading('h2', '2. Степень с рациональным показателем'),

    createHeading('h3', 'Определение'),
    createParagraph(
      'Рациональное число — это число вида m/n, где m — целое, n — натуральное (n ≥ 2).',
    ),

    createHeading('h3', 'Положительная дробная степень'),
    createEquationBlockNode('a^{\\frac{m}{n}} = \\sqrt[n]{a^m}'),
    createEquationBlockNode('a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m'),
    createParagraph(
      'Условие: a ≥ 0, если n чётное; a может быть любым, если n нечётное (обычно предполагают a > 0).',
    ),

    createHeading('h3', 'Отрицательная дробная степень'),
    createEquationBlockNode('a^{-\\frac{m}{n}} = \\frac{1}{a^{\\frac{m}{n}}}, \\quad (a > 0)'),

    createParagraph(
      'Для рациональных показателей справедливы те же пять свойств, что и для целых (при условии, что все выражения имеют смысл).',
    ),

    createHeading('h2', '3. Общие свойства степени (краткий свод)'),
    createParagraph('Для a > 0, b > 0 и любых действительных p, q:'),

    createEquationBlockNode('a^p \\cdot a^q = a^{p+q}', 'Произведение'),
    createEquationBlockNode('a^p : a^q = a^{p-q}', 'Частное'),
    createEquationBlockNode('(a^p)^q = a^{pq}', 'Степень степени'),
    createEquationBlockNode('(ab)^p = a^p \\cdot b^p', 'Степень произведения'),
    createEquationBlockNode('\\left(\\frac{a}{b}\\right)^p = \\frac{a^p}{b^p}', 'Степень частного'),

    createHeading('h3', 'Сравнение степеней'),
    createParagraph('Если a > 1, то функция a^x возрастает:'),
    createEquationBlockNode('a^p > a^q \\iff p > q', 'Возрастание при a > 1'),
    createParagraph('Если 0 < a < 1, то функция a^x убывает:'),
    createEquationBlockNode('a^p > a^q \\iff p < q', 'Убывание при 0 < a < 1'),
  ])
