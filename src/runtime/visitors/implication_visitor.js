module.exports = function (node, env) {
	var antecedent = env.visit(node.antecedent)
 	return !antecedent || env.visit(node.consequent)
}
