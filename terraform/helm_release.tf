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
  version    = "9.2.13"

  values = [
    file("./nginx-values.yaml")
  ]
}

resource "helm_release" "mongodb" {
  name       = "mongodb"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "mongodb"
  version    = "12.1.21"

  values = [
    file("./mongo-values.yaml")
  ]
}

resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  namespace        = "argocd"
  version          = "4.9.8"
  create_namespace = true
}

resource "kubectl_manifest" "config" {
  yaml_body  = file("../argocd/application.yaml")
  depends_on = [helm_release.argocd]
}

resource "helm_release" "prometheus" {
  name             = "prometheus"
  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "kube-prometheus-stack"
  namespace        = "prometheus"
  version          = "36.2.1"
  create_namespace = true

  values = [
    file("./prom-values.yaml")
  ]
}

resource "helm_release" "elastic" {
  name             = "elastic"
  repository       = "https://helm.elastic.co"
  chart            = "elasticsearch"
  namespace        = "elastic"
  version          = "7.17.3"
  create_namespace = true
}

resource "helm_release" "fluentd" {
  name             = "fluentd"
  repository       = "https://charts.bitnami.com/bitnami"
  chart            = "fluentd"
  namespace        = "elastic"
  create_namespace = true
  depends_on = [helm_release.elastic] 
}

resource "helm_release" "kibana" {
  name             = "kibana"
  repository       = "https://helm.elastic.co"
  chart            = "kibana"
  namespace        = "elastic"
  depends_on = [helm_release.elastic]
  # version = "10.1.16"
  version = "7.17.3"

  values = [
    file("./kibana-values.yaml")
  ]
}