import {
  createHeading,
  createParagraph,
  createList,
  createRichText,
  createEquationBlockNode,
} from '../../helpers/helpers'
import type { LexicalRichText } from '../../helpers/helpers'

export const logarithmsTheory = (): LexicalRichText =>
  createRichText([
    // 1. Определение
    createHeading('h2', 'Определение логарифма'),
    createParagraph(
      'Логарифм числа b по основанию a — это показатель степени, в которую нужно возвести основание a, чтобы получить число b.',
    ),
    createEquationBlockNode(
      '\\log_a b = x \\iff a^x = b',
      'Определение логарифма (a > 0, a ≠ 1, b > 0)',
    ),

    // 2. Основное логарифмическое тождество
    createHeading('h2', 'Основное логарифмическое тождество'),
    createParagraph(
      'Если взять степень числа a с показателем, равным логарифму числа b по основанию a, получим само число b.',
    ),
    createEquationBlockNode('a^{\\log_a b} = b', 'Основное логарифмическое тождество'),

    // 3. Свойства логарифмов
    createHeading('h2', 'Свойства логарифмов'),
    createParagraph('Пусть a > 0, a ≠ 1, x > 0, y > 0. Тогда верны следующие свойства.'),

    createHeading('h3', 'Базовые свойства'),
    createParagraph('Логарифм единицы и логарифм основания:'),
    createEquationBlockNode('\\log_a 1 = 0', 'Логарифм единицы'),
    createEquationBlockNode('\\log_a a = 1', 'Логарифм основания'),

    createHeading('h3', 'Логарифм произведения и частного'),
    createParagraph(
      'При умножении и делении аргументов логарифмы превращаются в сумму и разность.',
    ),
    createEquationBlockNode('\\log_a (xy) = \\log_a x + \\log_a y', 'Логарифм произведения'),
    createEquationBlockNode(
      '\\log_a \\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y',
      'Логарифм частного',
    ),

    createHeading('h3', 'Логарифм степени и корня'),
    createParagraph('Степень и корень можно «вынести» перед логарифмом.'),
    createEquationBlockNode('\\log_a (x^n) = n \\cdot \\log_a x', 'Логарифм степени'),
    createEquationBlockNode(
      '\\log_a \\sqrt[n]{x} = \\frac{1}{n} \\log_a x',
      'Логарифм корня как частный случай',
    ),

    // 4. Переход к новому основанию
    createHeading('h2', 'Переход к новому основанию'),
    createParagraph(
      'Иногда удобно заменить основание логарифма на другое число c (c > 0, c \\neq 1).',
    ),
    createEquationBlockNode(
      '\\log_a b = \\frac{\\log_c b}{\\log_c a}',
      'Формула перехода к новому основанию',
    ),
    createParagraph('Из формулы перехода следуют два полезных следствия.'),
    createEquationBlockNode(
      '\\log_a b = \\frac{1}{\\log_b a}',
      '«Переворот» логарифма (a и b меняются местами)',
    ),
    createEquationBlockNode(
      'a^{\\log_c b} = b^{\\log_c a}',
      'Равенство показательных выражений через логарифмы',
    ),

    // 5. Частные обозначения
    createHeading('h2', 'Частные случаи и обозначения'),
    createParagraph('Для некоторых оснований приняты специальные обозначения.'),
    createEquationBlockNode('\\log_{10} x = \\lg x', 'Десятичный логарифм'),
    createEquationBlockNode(
      '\\log_e x = \\ln x',
      'Натуральный логарифм: log_e x = ln x, где e ≈ 2,718.',
    ),

    // 6. Логарифмическая функция
    createHeading('h2', 'Логарифмическая функция'),
    createParagraph(
      'Логарифмическая функция — это функция, в которой переменная находится под знаком логарифма.',
    ),
    createEquationBlockNode('y = \\log_a x', 'Общий вид логарифмической функции'),
    createEquationBlockNode(
      'D(f): x > 0',
      'Область определения: аргумент логарифма должен быть положительным',
    ),
    createEquationBlockNode(
      'E(f): y \\in \\mathbb{R}',
      'Множество значений: любые действительные числа',
    ),
    createEquationBlockNode(
      '\\log_a 1 = 0 \\Rightarrow (1; 0) \\in \\text{графике}',
      'График всегда проходит через точку (1; 0)',
    ),
    createParagraph(
      'Монотонность: если a > 1, логарифмическая функция возрастает; если 0 < a < 1, функция убывает.',
    ),

    // 7. Уравнения
    createHeading('h2', 'Схема решения логарифмических уравнений'),
    createHeading('h3', 'Уравнения вида: '),
    createEquationBlockNode('\\log_a f(x) = \\log_a g(x)'),
    createParagraph(
      'Перед тем как «снимать» логарифмы, обязательно находим область допустимых значений.',
    ),
    createList(
      [
        'Найти ОДЗ: f(x) > 0, g(x) > 0.',
        'Поскольку логарифмическая функция монотонна, приравнять аргументы: f(x) = g(x).',
        'Решить получившееся уравнение и проверить корни по ОДЗ.',
      ],
      'ordered',
    ),
    createEquationBlockNode(
      '\\log_a f(x) = \\log_a g(x) \\Rightarrow f(x) = g(x)',
      'Снятие логарифмов при одинаковом основании',
    ),

    // 8. Неравенства
    createHeading('h2', 'Схема решения логарифмических неравенств'),
    createHeading('h3', 'Неравенства вида: '),
    createEquationBlockNode('\\log_a f(x) > \\log_a g(x)'),
    createParagraph(
      'При решении логарифмических неравенств всегда учитываем и основание a, и область допустимых значений.',
    ),
    createParagraph('Сначала выписываем условия на аргументы логарифмов:'),
    createList(
      ['f(x) > 0, g(x) > 0 (аргументы логарифмов должны быть положительны).'],
      'unordered',
    ),
    createParagraph('Далее учитываем знак основания:'),
    createEquationBlockNode(
      'a > 1:\\; \\log_a f(x) > \\log_a g(x) \\Rightarrow f(x) > g(x)',
      'При a > 1 знак неравенства сохраняется',
    ),
    createEquationBlockNode(
      '0 < a < 1:\\; \\log_a f(x) > \\log_a g(x) \\Rightarrow f(x) < g(x)',
      'При 0 < a < 1 знак неравенства меняется на противоположный',
    ),
    createParagraph(
      'После решения алгебраического неравенства делаем пересечение с ОДЗ, чтобы отсеять недопустимые значения.',
    ),
  ])
