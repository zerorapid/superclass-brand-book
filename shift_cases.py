import re

with open('src/SlideRenderer.tsx', 'r') as f:
    content = f.read()

# Shift cases
def replace_case(match):
    num = int(match.group(1))
    if num >= 10:
        return f"case {num+2}: //"
    return match.group(0)

content = re.sub(r'case (\d+): //', replace_case, content)

# Shift PageWrapper numbers
def replace_number(match):
    num = int(match.group(1))
    if num >= 11:
        return f'number="{num+2:02d}"'
    return match.group(0)

content = re.sub(r'number="(\d+)"', replace_number, content)

with open('src/SlideRenderer.tsx', 'w') as f:
    f.write(content)
