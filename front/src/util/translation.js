import * as helpers from 'remark-helpers'
import md5 from 'md5'
import remark from 'remark'

const isBlockElement = node => {
  return (
    node.type && ['paragraph', 'blockquote', 'heading', 'code', 'html', 'html', 'list', 'table'].includes(node.type)
  )
}

const ast2md = ast => remark().stringify(ast)

export default class MarkdownRender {
  constructor(markdown) {
    this.update(markdown)
    this.translation = {}
  }

  updateFromJson(json) {
    this.markdown = json.markdown
    this.ast = json.ast
    this.translation = json.translation
  }

  update(markdown) {
    this.markdown = markdown
    this.ast = this.version_generator(helpers.ast(this.markdown))
  }

  version_generator(ast) {
    if (helpers.hasChildren(ast)) {
      ast.children = ast.children.map(child => {
        if (isBlockElement(child)) {
          child.version = md5(ast2md(child))
          child = this.version_generator(child)
        }
        return child
      })
    }
    return ast
  }

  update_translation(version, language, content) {
    if (!this.translation[version]) {
      this.translation[version] = {}
    }
    this.translation[version][language] = content
  }

  generate_markdown() {}
}
