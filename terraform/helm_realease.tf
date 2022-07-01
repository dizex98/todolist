provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.cluster.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      args        = ["eks", "get-token", "--cluster-name", data.aws_eks_cluster.cluster.name]
      command     = "aws"
    }
  }
}

resource "helm_release" "nginx-ing" {
  name       = "nginx-ing"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "nginx-ingress-controller"
}

resource "helm_release" "mongodb" {
  name       = "mongodb"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "mongodb"

  values = [
    file("./mongo-values.yaml")
  ]
}

resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace = "argocd"
}

resource "helm_release" "todolist" {
  name       = "todolist"
  chart      = "../kube/todolist"
}

# data "kubectl_file_documents" "argocd" {
#   content = file("./argocd/install.yaml")
# }

# resource "kubectl_manifest" "argocd" {
#   for_each  = data.kubectl_file_documents.argocd.manifests
#   yaml_body = each.value
# }
