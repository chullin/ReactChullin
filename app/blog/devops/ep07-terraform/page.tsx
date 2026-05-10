'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  GitBranch,
  Layers,
  Zap,
  Box,
  Settings,
  Shield,
  Terminal
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function DevOpsEP07() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">
                EP.07
              </span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">
                DevOps 系列
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Terraform：Infrastructure as Code 入門
              <br />
              <span className="text-indigo-300">用程式碼管理雲端基礎設施</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl">
              Provider、Resource、State、Module — 告別手動點選 AWS Console，
              把整個雲端基礎設施變成可版本控制、可重現、可自動化的程式碼。
            </p>
            <div className="flex items-center gap-6 text-indigo-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5">
                <User size={14} /> Joseph Chen
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> 17 min read
              </span>
              <span className="flex items-center gap-1.5">
                <Terminal size={14} /> Terraform · AWS · IaC · GitHub Actions
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ─── Section 1: 為什麼需要 IaC ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">為什麼需要 Infrastructure as Code？</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            AWS Console 很直覺，點幾下就能建立一台 EC2。但當你的系統成長到需要管理幾十個資源時，
            「手動點選」這個工作方式會讓你付出慘痛的代價。
          </p>

          <CodeBlock
            title="手動操作 AWS Console 的問題"
            lang="text"
            code={`情境：你花了 3 天，手動點選 AWS Console 建立了：
  - 1 個 ECS Cluster
  - 3 個 EC2 Instance（t3.medium，Ubuntu 22.04）
  - 1 個 RDS PostgreSQL 15（db.t3.micro，Multi-AZ）
  - 1 個 ElastiCache Redis（cache.t3.micro）
  - 1 個 Application Load Balancer
  - 5 個 Security Groups（精心設定的 Inbound/Outbound Rules）
  - 3 個 IAM Roles（附有精細的 Policy）
  - 2 個 S3 Bucket（帶 Lifecycle Policy）

問題接踵而來：
  1. 同事不知道你做了什麼
     → 沒有文件（或文件馬上過時），新人上手困難

  2. 要在 Staging 環境複製一模一樣的設定？
     → 再手動點一遍（耗時 3 天，且容易出錯）

  3. 不小心刪了一個 Security Group？
     → 不知道原本的 Inbound Rules 是什麼，只能從 Access Log 裡猜

  4. 某個 IAM Policy 是誰改的？改了什麼？
     → 完全沒有 Audit Trail

  5. 災難復原（Disaster Recovery）？
     → 希望你有記錄每個資源的設定，否則從頭來過`}
          />

          <p className="text-gray-600 leading-relaxed">
            Infrastructure as Code（IaC）的核心思想是：把基礎設施的「期望狀態」
            寫成程式碼，交給工具去執行和管理。這帶來三個根本性的改變：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="border-0 shadow-md bg-indigo-50">
              <CardBody className="p-5 space-y-2">
                <GitBranch className="text-indigo-600" size={22} />
                <p className="font-black text-gray-800">版本控制</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  所有基礎設施的變更都在 Git history 裡。誰在什麼時候做了什麼，
                  一覽無遺。想回滾？git revert 就行。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-indigo-50">
              <CardBody className="p-5 space-y-2">
                <CheckCircle className="text-indigo-600" size={22} />
                <p className="font-black text-gray-800">可重現性</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  一個指令，在任何環境（Production、Staging、Dev）建立
                  一模一樣的設定。環境一致性問題從根本解決。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-indigo-50">
              <CardBody className="p-5 space-y-2">
                <Zap className="text-indigo-600" size={22} />
                <p className="font-black text-gray-800">自動化</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  CI/CD Pipeline 自動觸發 Terraform，部署基礎設施不需要
                  人工操作，減少人為失誤。
                </p>
              </CardBody>
            </Card>
          </div>

          <Card className="border-l-4 border-indigo-400 bg-indigo-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-indigo-800 mb-2">Terraform vs 其他 IaC 工具</p>
              <p className="text-indigo-700 text-sm leading-relaxed">
                IaC 工具不只 Terraform。AWS CloudFormation（只支援 AWS）、
                Pulumi（用真正的程式語言如 TypeScript 撰寫）、Ansible（偏向 Configuration Management）
                都是選項。Terraform 的優勢是：多雲支援（AWS、GCP、Azure、Vercel 通吃）、
                語法簡潔（HCL）、社群龐大、Provider 生態系豐富。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 2: 核心概念 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Box className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Terraform 核心概念</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            在寫第一行 Terraform 之前，先理解這六個核心概念。它們是整個 Terraform 心智模型的基礎，
            搞懂了，之後讀任何配置都能快速理解。
          </p>

          <CodeBlock
            title="六個核心概念速覽"
            lang="text"
            code={`Provider：連接到雲端平台的「橋接器」
  └── 告訴 Terraform：我要管理哪個雲端平台的資源
  └── 例：provider "aws" { region = "us-east-1" }
  └── 支援：AWS、GCP、Azure、Vercel、Cloudflare、GitHub...（數千個）

Resource：你要管理的「雲端資源」
  └── 每個 Resource 對應一個真實的雲端資源
  └── 例：resource "aws_instance" "web" { ... }  →  一台 EC2
  └── 格式：resource "<provider_resource_type>" "<local_name>" { ... }

State：Terraform 記錄「實際狀態」的地方
  └── terraform.tfstate 檔案，記錄每個 Resource 目前真實的狀態
  └── Terraform 靠 State 知道「現在有什麼」，比對「你想要什麼」，計算出差異
  └── 警告：不要手動編輯 tfstate！也不要 commit 到 Git（含敏感資訊）

Module：可重用的「配置集合」
  └── 類似函式：把一組 Resources 封裝成模組，可以重複使用
  └── 例：一個 web-app module，包含 ECS + ALB + Security Group

Variable：「輸入參數」
  └── 讓配置更靈活，不要 hardcode 環境相關的值
  └── 例：var.region、var.instance_type、var.environment

Output：「輸出值」
  └── 讓其他 Module 或使用者看到建立完成的資源資訊
  └── 例：output "app_url" { value = aws_lb.main.dns_name }`}
          />

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">State 的重要性（最容易誤解的概念）</h3>
            <p className="text-gray-600 leading-relaxed">
              Terraform 採用「宣告式（Declarative）」的設計：你告訴 Terraform「我想要什麼狀態」，
              它負責計算出「需要做什麼操作」來達到那個狀態。這個計算過程依賴 State 檔案。
            </p>
            <CodeBlock
              title="Terraform 如何使用 State 計算差異"
              lang="text"
              code={`你的 main.tf（期望狀態）：
  resource "aws_db_instance" "main" {
    allocated_storage = 50    ← 你改成 50 了
    instance_class    = "db.t3.micro"
  }

terraform.tfstate（實際狀態）：
  {
    "allocated_storage": 20,  ← 目前實際是 20
    "instance_class": "db.t3.micro"
  }

terraform plan 計算出的差異（Plan）：
  ~ aws_db_instance.main will be updated in-place
    - allocated_storage = 20
    + allocated_storage = 50

  Plan: 0 to add, 1 to change, 0 to destroy.

terraform apply 執行後：
  → 呼叫 AWS API 把 RDS 的 storage 從 20 GB 調整為 50 GB
  → 更新 terraform.tfstate 記錄新狀態`}
            />
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 3: 第一個 Terraform 配置 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Terminal className="text-purple-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">第一個 Terraform 配置</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            從一個完整但精簡的例子開始：用 Terraform 在 AWS 上建立一套 Web 應用的基礎設施，
            包含 VPC、Subnet、RDS。每一行都有解釋，讓你看懂 HCL（HashiCorp Configuration Language）的語法邏輯。
          </p>

          <CodeBlock
            title="main.tf — 完整的 Web 應用基礎設施"
            lang="hcl"
            code={`# main.tf — 建立一個 Web 應用基礎設施

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"    # 允許 5.x，不允許 6.x（防止破壞性升級）
    }
  }

  # 儲存 State 到 S3（團隊共用，不能用 local 的 tfstate）
  backend "s3" {
    bucket = "my-terraform-state"          # 必須先手動建立這個 bucket
    key    = "production/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.region    # 從 variable 讀取，不要 hardcode
}

# ─── Variables ──────────────────────────────────────────────────────

variable "region" {
  type        = string
  default     = "us-east-1"
  description = "AWS 部署區域"
}

variable "environment" {
  type        = string
  description = "環境名稱（production | staging | development）"
}

variable "app_name" {
  type        = string
  description = "應用程式名稱，用於資源命名"
}

variable "db_password" {
  type        = string
  sensitive   = true    # 不在 plan 輸出中顯示，保護敏感資訊
  description = "RDS 資料庫密碼"
}

# ─── Data Sources（查詢既有資源）───────────────────────────────────

# 查詢此 Region 可用的 AZ 清單
data "aws_availability_zones" "available" {
  state = "available"
}

# ─── VPC ────────────────────────────────────────────────────────────

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "\${var.app_name}-vpc"
    Environment = var.environment
    ManagedBy   = "terraform"    # 方便在 Console 識別哪些資源是 Terraform 管的
  }
}

# Internet Gateway（讓 VPC 內的資源能連上 Internet）
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id    # 引用同一個 tf 裡的其他 resource

  tags = {
    Name = "\${var.app_name}-igw"
  }
}

# ─── Subnets ─────────────────────────────────────────────────────────

# Public Subnet × 2（分散在兩個 AZ，提升可用性）
resource "aws_subnet" "public" {
  count = 2    # count meta-argument：建立 2 個相同結構的資源

  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index}.0/24"    # 10.0.0.0/24、10.0.1.0/24
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true    # 在這個 Subnet 啟動的 EC2 自動取得 Public IP

  tags = {
    Name = "\${var.app_name}-public-\${count.index + 1}"
    Type = "public"
  }
}

# Private Subnet × 2（RDS 放在這裡，不暴露在 Internet）
resource "aws_subnet" "private" {
  count = 2

  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index + 10}.0/24"    # 10.0.10.0/24、10.0.11.0/24
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "\${var.app_name}-private-\${count.index + 1}"
    Type = "private"
  }
}

# ─── RDS PostgreSQL ──────────────────────────────────────────────────

# RDS 需要一個 Subnet Group（指定要部署在哪些 Subnet）
resource "aws_db_subnet_group" "main" {
  name       = "\${var.app_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id    # [*] splat：取所有 private subnet 的 id

  tags = {
    Name = "\${var.app_name}-db-subnet-group"
  }
}

resource "aws_db_instance" "main" {
  identifier        = "\${var.app_name}-\${var.environment}-db"
  engine            = "postgres"
  engine_version    = "15.4"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  storage_type      = "gp3"

  db_name  = "app"
  username = "postgres"
  password = var.db_password    # 從 variable 注入，絕對不要 hardcode 在這裡！

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]

  backup_retention_period = 7        # 保留 7 天的自動備份
  backup_window           = "03:00-04:00"    # UTC 備份時間窗口
  maintenance_window      = "sun:04:00-sun-05:00"

  deletion_protection     = true     # 防止 terraform destroy 誤刪 RDS！
  skip_final_snapshot     = false    # destroy 前強制建立最後一個快照
  final_snapshot_identifier = "\${var.app_name}-final-snapshot"

  tags = {
    Environment = var.environment
  }
}

# ─── Security Group ──────────────────────────────────────────────────

resource "aws_security_group" "rds" {
  name        = "\${var.app_name}-rds-sg"
  description = "Allow PostgreSQL access from app servers only"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]    # 只允許 VPC 內部流量
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ─── Outputs ─────────────────────────────────────────────────────────

output "vpc_id" {
  value       = aws_vpc.main.id
  description = "VPC ID"
}

output "db_endpoint" {
  value       = aws_db_instance.main.endpoint
  sensitive   = true    # 不在 terminal 輸出中顯示（含 hostname）
  description = "RDS 連線端點"
}

output "public_subnet_ids" {
  value       = aws_subnet.public[*].id
  description = "Public Subnet IDs（供 ALB 使用）"
}`}
          />
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 4: 工作流程 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Settings className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Terraform 工作流程</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Terraform 的日常工作流程非常規律，核心就是三個步驟：
            <strong> init → plan → apply</strong>。
            理解每個步驟的作用，才能安心操作，不會誤刪資源。
          </p>

          <CodeBlock
            title="Terraform 完整工作流程"
            lang="bash"
            code={`# ─── 1. Init：初始化（第一次使用或換了 Backend/Provider 時執行）────────
terraform init

# 做了什麼：
# - 下載 Provider Plugin（如 AWS Provider 到 .terraform/ 目錄）
# - 初始化 Backend（連接到 S3 State 儲存）
# - 輸出：Terraform has been successfully initialized!

# ─── 2. Plan：預覽（告訴你「將要做什麼」，不真正執行）──────────────────
terraform plan

# 輸出範例：
# Terraform will perform the following actions:
#
#   + aws_vpc.main will be created
#       cidr_block = "10.0.0.0/16"
#       ...
#
#   + aws_subnet.public[0] will be created
#   + aws_subnet.public[1] will be created
#
#   ~ aws_db_instance.main will be updated in-place
#     - allocated_storage = 20
#     + allocated_storage = 50
#
#   - aws_security_group.old_sg will be destroyed
#
# Plan: 3 to add, 1 to change, 1 to destroy.

# 把 Plan 結果存到檔案（CI/CD 中很有用）
terraform plan -out=tfplan

# ─── 3. Apply：執行（輸入 yes 確認，或用 -auto-approve 跳過確認）──────
terraform apply

# 如果要用上一步儲存的 plan（保證 apply 的內容和 plan 一模一樣）
terraform apply tfplan

# ─── 其他常用指令 ──────────────────────────────────────────────────────

# 查看目前管理的所有資源
terraform show

# 列出 State 中的資源清單
terraform state list

# 格式化 .tf 檔案（自動對齊縮排）
terraform fmt

# 驗證語法是否正確
terraform validate

# 把某個「手動建立的資源」匯入到 Terraform State 管理
terraform import aws_instance.web i-0a1b2c3d4e5f67890

# 銷毀所有資源（危險！務必先 plan，確認不會誤刪）
terraform destroy`}
          />

          <Card className="border-l-4 border-red-400 bg-red-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-red-800 mb-2">terraform destroy 的安全防線</p>
              <p className="text-red-700 text-sm leading-relaxed">
                永遠不要在 Production 環境直接執行 <code className="bg-red-100 px-1 rounded">terraform destroy</code>。
                建議在 RDS 和重要資源上設定 <code className="bg-red-100 px-1 rounded">deletion_protection = true</code> 和
                <code className="bg-red-100 px-1 rounded">prevent_destroy = true</code>（lifecycle block），
                讓 Terraform 在嘗試銷毀這些資源時報錯，強制你手動解除保護才能刪除。
              </p>
            </CardBody>
          </Card>

          <CodeBlock
            title="lifecycle block — 防止誤刪重要資源"
            lang="hcl"
            code={`resource "aws_db_instance" "main" {
  # ... 其他設定 ...

  lifecycle {
    prevent_destroy = true    # terraform destroy 時，這個資源會報錯拒絕刪除

    # 只在明確需要時才刪除/重建（而不是因為某個設定改變就重建）
    ignore_changes = [
      password,    # 密碼在 DB 中改了，不要讓 Terraform 誤以為需要重建
    ]

    # 先建立新的，再刪除舊的（Zero-downtime replacement）
    create_before_destroy = true
  }
}`}
          />
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 5: Module ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Layers className="text-purple-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Module — 封裝可重用的配置</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            當你需要在 Production 和 Staging 建立相同的基礎設施時，
            如果每個環境都複製貼上一遍 <code className="bg-gray-100 px-1 rounded text-sm">.tf</code> 檔案，
            維護起來會是噩夢。Module 就是解法：把一組 Resources 封裝成可重用的模組，
            就像函式一樣可以傳入參數、複用邏輯。
          </p>

          <CodeBlock
            title="Module 目錄結構"
            lang="text"
            code={`terraform/
├── main.tf              ← 根模組，呼叫子模組
├── variables.tf         ← 根模組的 variables
├── outputs.tf           ← 根模組的 outputs
├── terraform.tfvars     ← 實際的變數值（放在 .gitignore！）
└── modules/
    ├── web-app/
    │   ├── main.tf      ← Web App 模組的主要配置
    │   ├── variables.tf ← 模組的輸入參數定義
    │   └── outputs.tf   ← 模組的輸出值定義
    └── database/
        ├── main.tf
        ├── variables.tf
        └── outputs.tf`}
          />

          <CodeBlock
            title="modules/web-app/main.tf — 定義一個可重用的 Web App 模組"
            lang="hcl"
            code={`# modules/web-app/variables.tf
variable "app_name" {
  type        = string
  description = "應用程式名稱"
}

variable "environment" {
  type        = string
  description = "環境名稱"
}

variable "instance_count" {
  type        = number
  default     = 2
  description = "ECS Service 的執行個數"
}

variable "vpc_id" {
  type        = string
  description = "部署到哪個 VPC"
}

variable "subnet_ids" {
  type        = list(string)
  description = "ECS 任務執行的 Subnet 清單"
}

# modules/web-app/main.tf
resource "aws_ecs_cluster" "main" {
  name = "\${var.app_name}-\${var.environment}"

  setting {
    name  = "containerInsights"
    value = "enabled"    # 開啟 CloudWatch Container Insights
  }

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_ecs_task_definition" "main" {
  family                   = "\${var.app_name}-\${var.environment}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512

  container_definitions = jsonencode([
    {
      name      = var.app_name
      image     = "\${aws_ecr_repository.main.repository_url}:latest"
      essential = true
      portMappings = [
        { containerPort = 3000, protocol = "tcp" }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/\${var.app_name}"
          "awslogs-region"        = "us-east-1"
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "main" {
  name            = var.app_name
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.main.arn
  desired_count   = var.instance_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = true
  }

  # 部署策略：先啟動新的，再停舊的（Zero-downtime）
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
}

# modules/web-app/outputs.tf
output "cluster_arn" {
  value       = aws_ecs_cluster.main.arn
  description = "ECS Cluster ARN"
}

output "service_name" {
  value       = aws_ecs_service.main.name
  description = "ECS Service 名稱"
}`}
          />

          <CodeBlock
            title="根 main.tf — 用 Module 部署多個環境"
            lang="hcl"
            code={`# terraform/main.tf

# Production 環境 — 跑 5 個執行個數
module "production_app" {
  source = "./modules/web-app"

  app_name       = "myapp"
  environment    = "production"
  instance_count = 5         # 生產環境需要 5 個，保障高可用
  vpc_id         = aws_vpc.production.id
  subnet_ids     = aws_subnet.production_public[*].id
}

# Staging 環境 — 跑 1 個執行個數（省錢）
module "staging_app" {
  source = "./modules/web-app"

  app_name       = "myapp"
  environment    = "staging"
  instance_count = 1         # 暫存環境只跑 1 個就夠了
  vpc_id         = aws_vpc.staging.id
  subnet_ids     = aws_subnet.staging_public[*].id
}

# 引用 Module 的 Output
output "production_cluster_arn" {
  value = module.production_app.cluster_arn
}

output "staging_service_name" {
  value = module.staging_app.service_name
}`}
          />

          <Card className="border-l-4 border-purple-400 bg-purple-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-purple-800 mb-2">善用 Terraform Registry 的官方模組</p>
              <p className="text-purple-700 text-sm leading-relaxed">
                不需要所有 Module 都自己寫。Terraform Registry（<code className="bg-purple-100 px-1 rounded">registry.terraform.io</code>）
                上有 HashiCorp 和社群維護的官方模組，涵蓋 VPC、EKS、RDS 等常見架構。
                例如 <code className="bg-purple-100 px-1 rounded">terraform-aws-modules/vpc/aws</code> 是
                AWS VPC 最廣泛使用的模組，已解決了所有常見的 Subnet、Route Table、NAT Gateway 設定。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 6: 最佳實踐 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Shield className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Terraform 最佳實踐</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Terraform 很強大，但用不好也能讓你付出慘痛代價。
            以下是在 Production 環境中必須遵守的最佳實踐，每一條都是血淚教訓。
          </p>

          <CodeBlock
            title="最佳實踐 1：永遠使用 Remote State + State Locking"
            lang="hcl"
            code={`# 絕對不要用 local 的 terraform.tfstate（會因為人員不同步而衝突）
# 使用 S3 + DynamoDB 實現 Remote State 和 State Locking

terraform {
  backend "s3" {
    bucket         = "company-terraform-state"    # 存放 tfstate 的 S3 bucket
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true     # 靜態加密，保護 tfstate 中的敏感資訊

    # DynamoDB Table 用於 State Locking
    # 防止兩個人同時 apply，造成 State 損壞
    dynamodb_table = "terraform-state-lock"
  }
}

# 建立 DynamoDB Lock Table（只需做一次，可以用獨立的 bootstrap tf 管理）
resource "aws_dynamodb_table" "terraform_lock" {
  name         = "terraform-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}`}
          />

          <CodeBlock
            title="最佳實踐 2：敏感資訊的正確處理方式"
            lang="hcl"
            code={`# variables.tf — 聲明敏感變數
variable "db_password" {
  type        = string
  sensitive   = true    # plan/apply 輸出中不顯示此值
  description = "RDS 資料庫密碼（從環境變數或 Secret Manager 注入）"
}

variable "jwt_secret" {
  type      = string
  sensitive = true
}

# ─────────────────────────────────────────────────────────────────────
# 方法 A：terraform.tfvars（本地開發用，放在 .gitignore！）
# terraform.tfvars 內容：
# db_password = "local-dev-password-only"
#
# 方法 B：環境變數（CI/CD 推薦，TF_VAR_ 前綴自動對應 variable）
# export TF_VAR_db_password=\${{ secrets.DB_PASSWORD }}
# export TF_VAR_jwt_secret=\${{ secrets.JWT_SECRET }}
#
# 方法 C：AWS Secrets Manager（Production 最佳實踐）
# ─────────────────────────────────────────────────────────────────────

# 從 AWS Secrets Manager 讀取密碼（零明文儲存）
data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = "production/myapp/db-password"
}

resource "aws_db_instance" "main" {
  # ...
  password = data.aws_secretsmanager_secret_version.db_password.secret_string
}

# .gitignore — 必須加上這些
# terraform.tfvars
# *.tfvars
# .terraform/
# terraform.tfstate
# terraform.tfstate.backup
# crash.log`}
          />

          <CodeBlock
            title="最佳實踐 3：GitHub Actions 自動化 Terraform"
            lang="yaml"
            code={`# .github/workflows/terraform.yml
name: Terraform CI/CD

on:
  push:
    branches: [main]
    paths: ['terraform/**']    # 只有 terraform/ 目錄有變更時才觸發
  pull_request:
    branches: [main]
    paths: ['terraform/**']

jobs:
  terraform:
    name: Terraform Plan & Apply
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write    # 允許寫入 PR Comment（貼 Plan 結果）

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.7.0"
          # 也可以用 terraform_wrapper: false 關閉 wrapper 取得純輸出

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Terraform Init
        run: terraform -chdir=terraform init

      - name: Terraform Format Check
        run: terraform -chdir=terraform fmt -check -recursive
        # 如果有格式問題，Pipeline 失敗，強制開發者 fmt 後才能 merge

      - name: Terraform Validate
        run: terraform -chdir=terraform validate

      - name: Terraform Plan
        id: plan
        run: |
          terraform -chdir=terraform plan \\
            -var="db_password=\${{ secrets.DB_PASSWORD }}" \\
            -out=tfplan \\
            -no-color 2>&1 | tee plan_output.txt
        continue-on-error: true    # Plan 失敗也繼續，讓後面步驟能貼 Comment

      - name: Comment Plan on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const plan = fs.readFileSync('plan_output.txt', 'utf8');
            const body = \`## Terraform Plan\n\n\`\`\`\n\${plan}\n\`\`\`\`;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body,
            });

      - name: Terraform Apply（只有 main branch 才執行）
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        run: |
          terraform -chdir=terraform apply \\
            -var="db_password=\${{ secrets.DB_PASSWORD }}" \\
            -auto-approve \\
            tfplan`}
          />

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">工作流程建議：PR Review 前先看 Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-md">
                <CardBody className="p-5 space-y-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <p className="font-bold text-gray-800 text-sm">推薦流程</p>
                  <ol className="text-gray-600 text-xs space-y-1 list-decimal list-inside">
                    <li>開一個 Feature Branch 修改 .tf 檔案</li>
                    <li>開 PR → GitHub Actions 自動跑 Plan</li>
                    <li>Reviewer 看 Plan 結果（貼在 PR Comment）</li>
                    <li>確認 Plan 沒問題後才 Merge</li>
                    <li>Merge 到 main → 自動 Apply</li>
                  </ol>
                </CardBody>
              </Card>
              <Card className="border-0 shadow-md">
                <CardBody className="p-5 space-y-2">
                  <AlertTriangle className="text-amber-500" size={20} />
                  <p className="font-bold text-gray-800 text-sm">常見錯誤</p>
                  <ul className="text-gray-600 text-xs space-y-1 list-disc list-inside">
                    <li>直接在 main branch 改 tf 並 apply（無 Review）</li>
                    <li>把 tfvars 或 tfstate commit 進 Git</li>
                    <li>沒有 State Locking，多人同時 apply</li>
                    <li>在 CI 中使用有過多權限的 IAM Key</li>
                    <li>忘記設定 deletion_protection 就執行 destroy</li>
                  </ul>
                </CardBody>
              </Card>
            </div>
          </div>

          <Card className="border-l-4 border-indigo-400 bg-indigo-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-indigo-800 mb-2">進階：Terragrunt 解決多環境管理問題</p>
              <p className="text-indigo-700 text-sm leading-relaxed">
                當你需要管理 10 個以上的環境（多個 AWS 帳號、多個 Region），
                重複的 <code className="bg-indigo-100 px-1 rounded">backend</code> 和 <code className="bg-indigo-100 px-1 rounded">provider</code> 配置會讓你痛苦。
                Terragrunt 是 Terraform 的 Wrapper，讓你能 DRY（Don't Repeat Yourself）地管理多環境配置。
                它在 Monorepo 架構的 IaC 管理中非常流行。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Tags ─── */}
        <motion.section
          className="space-y-4"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-black text-gray-700">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {['Terraform', 'IaC', 'AWS', 'Infrastructure as Code', 'DevOps', 'Cloud'].map((tag) => (
              <Chip key={tag} variant="flat" color="secondary" size="sm">
                {tag}
              </Chip>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Navigation ─── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link
              href="/blog/devops/ep06-monitoring"
              className="flex items-center gap-3 p-5 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100 group"
            >
              <ArrowLeft
                className="text-indigo-500 group-hover:-translate-x-1 transition-transform"
                size={20}
              />
              <div>
                <p className="text-xs text-gray-400 font-medium">上一篇</p>
                <p className="font-black text-gray-800 text-sm">EP.06 監控與告警</p>
              </div>
            </Link>

            <Link
              href="/blog/devops/ep01-test-pyramid"
              className="flex items-center gap-3 p-5 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100 group text-right"
            >
              <div>
                <p className="text-xs text-gray-400 font-medium">下一篇</p>
                <p className="font-black text-gray-800 text-sm">EP.01 測試金字塔</p>
              </div>
              <ArrowRight
                className="text-indigo-500 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
