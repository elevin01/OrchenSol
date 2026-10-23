#!/usr/bin/env python3
"""Regenerate the downloadable brief from its HTML source (requires reportlab)."""
from html import escape
from html.parser import HTMLParser
from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "resources/ai-policy-brief/index.html"
OUTPUT = ROOT / "assets/orchen-ai-policy-brief.pdf"


class Node:
    def __init__(self, tag="", attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []

    def find(self, selector):
        return [n for n in self.walk() if selector in n.attrs.get("class", "").split()]

    def walk(self):
        for child in self.children:
            if isinstance(child, Node):
                yield child
                yield from child.walk()

    def markup(self):
        content = "".join(c.markup() if isinstance(c, Node) else escape(c) for c in self.children)
        if self.tag in ("strong", "b"):
            return f"<b>{content}</b>"
        if self.tag == "a":
            url = self.attrs.get("href", "")
            if url.startswith("/"):
                url = "https://orchen.ai" + url
            return f'<link href="{escape(url, quote=True)}" color="#256552">{content}</link>'
        if self.tag == "span" and self.attrs.get("class") == "sub":
            return f'<br/><font color="#5B6560">{content}</font>'
        return content


class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in {"meta", "link", "br", "hr", "img", "input", "source", "wbr"}:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def clean(text):
    text = re.sub(r"\s+", " ", text).strip()
    return text.replace("–", "-").replace("—", "-").replace("−", "-").replace("↗", "").replace("’", "'")


def main():
    font_dir = Path('/usr/share/fonts/truetype/dejavu')
    for name, filename in [('Brief', 'DejaVuSans.ttf'), ('BriefBold', 'DejaVuSans-Bold.ttf'), ('BriefDisplay', 'DejaVuSerif-Bold.ttf')]:
        pdfmetrics.registerFont(TTFont(name, str(font_dir / filename)))
    pdfmetrics.registerFontFamily('Brief', normal='Brief', bold='BriefBold', italic='Brief', boldItalic='BriefBold')
    parser = Parser()
    parser.feed(SOURCE.read_text())
    root = parser.root
    ink, green = colors.HexColor("#233B2E"), colors.HexColor("#256552")
    styles = {
        "title": ParagraphStyle("title", fontName="BriefDisplay", fontSize=26, leading=30, textColor=ink, spaceAfter=12),
        "section": ParagraphStyle("section", fontName="BriefDisplay", fontSize=23, leading=28, textColor=ink, spaceAfter=14),
        "head": ParagraphStyle("head", fontName="BriefBold", fontSize=10.5, leading=14, textColor=green, spaceAfter=5),
        "body": ParagraphStyle("body", fontName="Brief", fontSize=10, leading=14.5, textColor=ink, spaceAfter=11),
        "small": ParagraphStyle("small", fontName="Brief", fontSize=8.5, leading=12, textColor=colors.HexColor("#5B6560"), spaceAfter=10),
    }
    def p(text, style="body"):
        return Paragraph(clean(text), styles[style])
    def footer(canvas, doc):
        canvas.setStrokeColor(colors.HexColor("#D9DED7"))
        canvas.line(48, 43, 547, 43)
        canvas.setFont("Brief", 8)
        canvas.setFillColor(green)
        canvas.drawString(48, 29, "ORCHEN  |  October 2026  |  orchen.ai")
        canvas.drawRightString(547, 29, str(doc.page))

    doc = SimpleDocTemplate(str(OUTPUT), pagesize=(595.28, 841.89), rightMargin=48, leftMargin=48,
                           topMargin=43, bottomMargin=58, title="The AI Policy Brief for School Leaders",
                           author="Orchen", subject="October 2026 research, decision framework and policy checklist")
    story = [p("ORCHEN / FOR SCHOOL LEADERSHIP / OCTOBER 2026", "small"),
             p("The AI Policy Brief for School Leaders.", "title"),
             p("01 / The evidence", "head"),
             p("Recent trials show both promise and risk. Surveys describe use and concern. Neither validates a vendor by itself.")]
    cards = root.find("feature-cell")
    assert len(cards) == 6, "Expected six evidence cards"
    for card in cards:
        figure = card.find("brief-figure")[0].markup()
        head = card.find("feature-cell__head")[0].markup()
        body = card.find("feature-cell__body")[0].markup()
        story.append(KeepTogether([p(figure + "  |  " + head, "head"), p(body)]))
    story.append(p('These studies did not evaluate Orchen. Full citations and context: <link href="https://orchen.ai/the-problem" color="#256552">orchen.ai/the-problem</link>. Reviewed October 5, 2026.', "small"))
    story.extend([PageBreak(), p("02 / The decision framework", "head"),
                  p("Three honest options, and what each one costs.", "section")])
    options = root.find("row")
    assert len(options) == 3, "Expected three policy options"
    for row in options:
        story.extend([p(row.find("row-eyebrow")[0].markup(), "small"),
                      p(row.find("row-head")[0].markup(), "head"),
                      p(row.find("row-body")[0].markup()), Spacer(1, 12)])
    story.append(p(root.find("legal-note")[0].markup(), "small"))
    story.extend([PageBreak(), p("03 / The policy checklist", "head"),
                  p("Twelve questions to settle before any deployment.", "section"),
                  p("Use this in a leadership meeting or send it to any vendor, including us. The quality of the answers tells you most of what you need to know.")])
    questions = root.find("check-text")
    assert len(questions) == 12, "Expected twelve policy questions"
    for index, question in enumerate(questions, 1):
        story.append(KeepTogether([p(f"<b>{index:02d}.</b>  " + question.markup())]))
    story.extend([Spacer(1, 8), p('Run the checklist against us: <link href="https://orchen.ai/trust" color="#256552">Trust Center</link> and <link href="https://orchen.ai/platform/" color="#256552">platform documentation</link>.', "small")])
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)


if __name__ == "__main__":
    main()
